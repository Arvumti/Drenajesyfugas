var router = Backbone.Router.extend({
    routes: {
        '' : 'index',
        ':mod(/)': 'dynamic',
        ':mod/:id(/)': 'dynamic'
    },
    index: function() {
        console.log('---- INDEX ----');
        app.currView.close();
    },
    dynamic: function(mod, id) {
        if(!mod)
            return null;
        app.loadAsync(mod);
    },
});

define([], function () {
    return router;
});