/*!
 * 统计模块中的接口并汇总
 * by 李双宝
 */
var fs = require('fs');
var path = require('path');

// 递归目录查找模块
function modules() {
  var result = [];
  var base = path.join(__dirname, './src/modules');
  fs.readdirSync(base).forEach(function(file) {
    file = path.resolve(base, file);
    var stat = fs.statSync(file);
    if (stat && stat.isDirectory() && fs.existsSync(path.join(file, 'index.jsx'))) {
      result.push(file);
    }
  });
  return result;
}


// 递归遍历目录
var walk = exports.walk = function(dir) {
  var results = [];
  var list = fs.readdirSync(dir);
  var pending = list.length;

  list.forEach(function(file) {
    file = path.resolve(dir, file);
    var stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (path.extname(file) === '.jsx') {
      results.push(file);
    }
  });
  return results;
};

var sort = /\$\.(get|post)\((['"])([^,]+)\2,\s*({[^}]+})?/ig;
var load = /<loader.*?url=(['"])(.+)\1/ig;
var ajax = /\$\.ajax\(({[^;]+}),?/ig;

function handleMatch(content) {
  var a = handleSort(content) || [];
  var b = handleLoad(content) || [];
  var c = handleAjax(content) || [];
  return a.concat(b).concat(c);
}

// $.get || $.post
function handleSort(content) {
  var matches = content.match(sort);
  return matches && matches.map(function(item) {
    item = item.replace(/\n*\s+\n*/g, ' ');
    var list = item.match(/\$\.(get|post)\((['"])([^,]+)\2,\s*({[^}]+})?/i);
    return {
      url: list[3],
      type: list[1],
      data: list[4] || '{}',
    };
  });
}

// <Loader url="..."> Component
function handleLoad(content) {
  var matches = content.match(load);
  return matches && matches.map(function(item) {
    item = item.replace(/\n*\s+\n*/g, ' ');
    var list = item.match(/<loader.*?url=(['"])(.+)\1/i);
    return {
      url: list[2],
      type: 'get',
      data: '{}',
    };
  });
}

// $.ajax
function handleAjax(content) {
  var matches = content.match(ajax);
  return matches && matches.map(function(item) {
    item = item.replace(/\n*\s+\n*/g, ' ');
    var url = item.match(/url:\s*(['"])([^,]+)\1/i);
    var type = item.match(/type:\s*(['"])([^,]+)\1/i);
    var data = item.match(/data:\s*({[^;]+})/i);

    return {
      url: url[2],
      type: type ? type[2] : 'get',
      data: data ? data[1] : '{}',
    };
  });
}

// 遍历目录
modules().forEach(function(dir) {
  var files = walk(dir);
  var module = path.basename(dir);
  var apis = [];
  files.forEach(function(f) {
    var adt = handleMatch(fs.readFileSync(f).toString());
    if (adt) {
      apis = apis.concat(adt);
    }
  });
  if (apis.length) {
    // 去重
    for (var i = apis.length - 1; i > 0; i--) {
      var x = apis[i];
      for (var j = i - 1; j >= 0; j--) {
        var y = apis[j];
        if (x.url === y.url && x.type === y.type) {
          apis.splice(i, 1);
          break;
        }
      }
    }
    // 排序
    apis = apis.sort((a, b) => {
      if (a.type > b.type) {
        return 1;
      }
      if (a.type < b.type) {
        return -1;
      }
      if (a.url > b.url) {
        return 1;
      }
      if (a.url < b.url) {
        return -1;
      }
      return 0;
    });


    fs.writeFileSync(path.resolve(dir, '.apidoc'), `接口总数：${ apis.length }个\n\n` + JSON.stringify(apis, null, 2));
  }
});
