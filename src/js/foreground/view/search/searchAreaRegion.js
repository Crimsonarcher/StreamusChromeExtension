﻿define([
    'foreground/view/search/searchView'
], function (SearchView) {
    'use strict';
    
    var SearchAreaRegion = Backbone.Marionette.Region.extend({
        el: '#foregroundArea-searchAreaRegion',
        settings: null,
        
        initialize: function () {
            this.settings = Streamus.backgroundPage.Settings;

            this.listenTo(Streamus.channels.searchArea.commands, 'show', this._showSearchView);
            this.listenTo(Streamus.channels.foregroundArea.vent, 'shown', this._onForegroundAreaShown);
        },

        _showSearchView: function (transitionIn) {
            this.currentView.visible ? this._focusSearchView() : this.currentView.show(transitionIn);
        },
        
        _onForegroundAreaShown: function () {
            this._createSearchView();

            if (this.settings.get('alwaysOpenToSearch')) {
                this._showSearchView(false);
            }
        },
        
        //  Returns true if SearchView is currently shown
        _searchViewExists: function () {
            return !_.isUndefined(this.currentView) && this.currentView instanceof SearchView;
        },
        
        //  Focus the SearchView to bring attention to it -- the user might not have realized it is already open.
        _focusSearchView: function () {
            this.currentView.focusInput();
        },
        
        _createSearchView: function () {
            if (!this._searchViewExists()) {
                var searchView = new SearchView({
                    model: Streamus.backgroundPage.Search,
                    collection: Streamus.backgroundPage.Search.get('results')
                });

                this.show(searchView);
            }
        }
    });

    return SearchAreaRegion;
});