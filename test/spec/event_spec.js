define(['utils', 'event'], function(utils, event) {
  "use strict";

  describe('(Core) Event', function() { 
    describe('#listenTo() #trigger()', function () {
      it('should receive listening event from the event', function () {

      var Animal = function (name) {
          this.name = name;
      };
          
      Animal.prototype = {
          getName : function () {
              return this.name;
          }
      }

      utils.merge(Animal.prototype, event);
    
        var dog = new Animal('wang');
        var person = utils.merge({
            run: function (e) {
                this.trigger('run');
                this.running = true;
            }
        }, event);

        // event subscribing
        // dog.on('buck', person.run, person);
        person.listenTo(dog, 'buck', person.run);

        event.listenTo(dog, 'buck', function(e) {
            // console.log('I have got an event');
            // console.log(this, e);
        });
        
        // event firing
        dog.trigger('buck');

        expect(person.running).to.equal(true);
      });
    });

    describe('listenTo all', function () {
      it('should receive all kind of event from the event source', function () {

        var Animal = function (name) {
            this.name = name;
        };
            
        utils.merge(Animal.prototype, event);

        var dog = new Animal('wang');
        var name;

        dog.on('all', function(dogname) {
            name = dogname;
        });

        dog.trigger('buck', dog.name);

        expect(name).to.equal(dog.name);
      });
    });

    describe('delegate', function () {
      it('should not change event object from the event source', function () {

        var Animal = function () {}
            
        utils.merge(Animal.prototype, event);

        var dog = new Animal();

        var Hutch = function() {}

        utils.merge(Hutch.prototype, event);

        var hutch = new Hutch();

        var Home = function() {}

        utils.merge(Home.prototype, event);

        var home = new Home();

        var bucked = 0;
        home.on('buck', function() {
          bucked++;
        });

        home.on('huck', function() {
          bucked+=2;
        });

        hutch.delegate_on(home)
        dog.delegate_on(hutch);

        dog.trigger('buck');
        dog.trigger('huck');

        expect(bucked).to.equal(3);
      });
    });      
  });
});


 
 