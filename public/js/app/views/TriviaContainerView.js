// IndexView.js

define(["app", "utils", "models/TriviaModel","collections/TriviaCollection", "views/TriviaView", "text!templates/TriviaContainer.html", "text!templates/Hint.html"],

    function(app, utils,  Model, TriviaCollection, TriviaView, template, HintTemplate){

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
                "click #trivia-btn": "triviaFormAction",
                "click #trivia-hide-btn": "hideTriviaForm",
                "click #add-hints": "addHints",
                "click .remove-hint": "removeHint"
            },

            addHints: function(evt) {
                var nb_hints = $('textarea.hints').length;
                var strPosition = utils.getNumberPositionString(nb_hints + 1);

                $('#add-trivia-form').append(this.hintTemplate({
                    hint_id: (nb_hints + 1),
                    hint_num_label: strPosition
                }));
            },

            removeHint: function(evt){
                evt.preventDefault();
                console.log('TriviaContainerView', 'removeHint', 'evt', evt);
                $(evt.target).closest('.form-group').remove();
                var hints = $('textarea.hints');
                $.each(hints, function(i, e){
                    i = i + 1;
                    // utils.getNumberPosition  String(i + 1);
                    $(e).siblings('label').attr('for', 'hint-' + (i));
                    $(e).siblings('label').html((i) + utils.getNumberPositionString(i) + '  hint <a class="remove-hint" id="'+ i +'">remove</a>');
                    $(e).attr('id', 'hint-' + (i));
                });


            },

            triviaFormAction: function(evt){
                evt.preventDefault();
                var formData = {};
                var hasErrors = false;
                var form_el = $('form, #add-trivia-form'); 
                var isFormVisible = form_el.is(':visible');

                $('#trivia-hide-btn').css('display','block');
                $('#add-hints').css('display','block');
              
                if (!isFormVisible){
                    buttonText = this.arrButtonText[1];
                    form_el.show(750);
                }
                else {
                    formData.hints = [];
                    $('#add-trivia-form div').children('input, textarea').each(function(i, el) {
                        if($(el).val()==='') {
                            utils.showAlert('Error!', 'Cannot Add with empty fields','alert-danger');
                            hasErrors = true;
                        }
                        else {
                            var isHint = $.inArray('hints', $(this).attr('class').split(' ')) > - 1;
                            if (isHint) {
                                formData.hints.push({hint: $(el).val() });
                                // for each hints append it to the hints property of formData
                            }
                            else {
                              formData[el.id] = $(el).val();
                            }
                        }
                    });

                    if (!hasErrors) {
                        console.log('TriviaContainerView', 'user session', app.session.get('user'));
                        formData.username = app.session.get('user').name;
                        formData.user_id = app.session.get('user').user_id;
                        $("#add-trivia-form")[0].reset();   
                        this.triviaCollection.create(formData);
                        utils.showAlert('Trivia question added!', 'Thanks', 'alert-success');
                    }
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
                    renderForListView: true
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