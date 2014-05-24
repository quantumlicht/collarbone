// IndexView.js

define(["app", "utils", "models/TriviaModel","collections/TriviaCollection", "views/TriviaView", "text!templates/TriviaContainer.html", "text!templates/Hint.html"],

    function(app, utils, Model, TriviaCollection, TriviaView, template, HintTemplate){

        var TriviaContainerView = Backbone.View.extend({

            // The DOM Element associated with this view
            // el: ".magic",
            arrButtonText: ['Add Trivia Question','Submit Trivia Question'],
            template: Handlebars.compile(template),
            hintTemplate: Handlebars.compile(HintTemplate),
            // View constructor
            initialize: function() {
                // Calls the view's render method
                _.bindAll(this);
                console.log('TriviaContainerView','initialize');
                this.triviaCollection = new TriviaCollection();
                this.triviaCollection.fetch({reset: true});
                this.render();
                this.listenTo(this.triviaCollection, 'reset', this.render);
                this.listenTo(this.triviaCollection, 'add', this.renderTrivia);

            },

            // View Event Handlers
            events: {
                "click #trivia-btn": "showTriviaForm",
                "click #trivia-hide-btn": "hideTriviaForm",
                "click #add-hints": "addHints"
            },

            addHints: function(evt) {
              var nb_hints = $('textarea.hints').length;
              var strPosition = utils.getNumberPositionString(nb_hints + 1);

              $('#add-trivia-form').append(this.hintTemplate({
                hint_id: (nb_hints + 1),
                hint_num_label: strPosition
              }));
            },

            showTriviaForm: function(evt){
              evt.preventDefault();
              var formData = {};
              var form_el = $('form, #add-trivia-form'); 
              var isFormVisible = form_el.is(':visible');

              $('#trivia-hide-btn').css('display','block');
              $('#add-hints').css('display','block');
              
              if (!isFormVisible){
                buttonText = this.arrButtonText[1];
                form_el.show(750);
              }
              else {
                  formData['hints'] = [];
                  $('#add-trivia-form div').children('input, textarea').each(function(i, el) {

                    var isHint = $.inArray('hints', $(this).attr('class').split(' ')) > - 1;
                    if (isHint) {
                        formData['hints'].push({hint: $(el).val() });
                        // for each hints append it to the hints property of formData
                    }
                    else if ($(el).val() !== '') {
                      formData[el.id] = $(el).val();
                    }
                    $(el).val('');
                  });
                  formData['author'] = app.session.get('user').username;
               this.triviaCollection.create(formData);
              }
              $('button#trivia-btn').text(buttonText);


            },

            hideTriviaForm: function(evt) {
              var form_el = $('form, #add-trivia-form'); 
              form_el.hide(750);
              $('#trivia-hide-btn').css('display','none');
              $('#add-hints').css('display','none');
            },

            // Renders the view's template to the UI
            render: function() {
                this.$el.html(this.template);
                console.log('TriviaContainerView','render','this.triviaCollection',this.triviaCollection);
                this.triviaCollection.each(function(item) {
                  console.log('TriviaContainerView','render:each','item', item);
                    this.renderTrivia(item);
                },this);

                return this;
            },

            renderTrivia: function(trivia) {
              console.log('TriviaContainerView', 'renderTrivia','trivia', trivia);
                var triviaView = new TriviaView({
                  model:trivia,
                  partialRender: true
                });
                this.$el.find('#triviaContainer').append(triviaView.render().el);

                // Maintains chainability
                return this;

            }

        });

        // Returns the View class
        return TriviaContainerView;

    }

);