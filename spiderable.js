if (Meteor.isClient) {
  /*
   * MENU TEMPLATE
   */
  Template.menu.events({
    'click a.open-page' : function (ev) {
      pageRouter.openPage($(ev.currentTarget).attr('data-page'));
      return false;
    }
  , 'click a.open-home' : function () {
      pageRouter.openHome();
      return false;
    }
  });

  /*
   * PAGE TEMPLATE
   */
  Template.page.page = function () {
    return Session.get('page');
  };
  Template.page.isHome = function () {
    return Session.equals('page', '');
  };

  /*
   * BACKBONE ROUTER
   */
  var PageRouter = Backbone.Router.extend({
    routes: {
      "page/:page": "openPage"
    , "":           "openHome"
    }
  , openPage: function(page) {
      this.navigate('page/'+page);
      Session.set('page', page);
    }
  , openHome: function() {
      this.navigate('');
      Session.set('page', '');
    }
  });
  var pageRouter = new PageRouter();
  Backbone.history.start({pushState: true});
}
