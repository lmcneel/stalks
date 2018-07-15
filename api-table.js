module.exports =  function (baseUrl, routes) {
   const Table = require('cli-table');
   const table = new Table({ head: ["", "Path"] });
    console.log('\nAPI for ' + baseUrl);
    console.log('\n********************************************');

    for (let key in routes) {
        if (routes.hasOwnProperty(key)) {
           const val = routes[key];
            if (val.route) {
                val = val.route;
               const _o = {};
                _o[val.stack[0].method]  = [baseUrl + val.path];    
                table.push(_o);
            }       
        }
    }

    console.log(table.toString());
    return table;
};
