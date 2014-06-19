
(function($){

	//validation
	var Validate = {
		name: function(txt){},
		email: function(txt){},
		location: function(){},
		sex: function(){},
		message: function(txt){},
		all: function(){},
	};

	// user interaction
	var UI = {

		//defining these variables up front so I know they will
		name:"",
		email:"",
		loc:"",
		sex:"",
		msg:"",


		FeedbackString:"",

		init:function(){
			//set intercation events
			$("info-form-button").on ("click",function(event){
				event.preventDefault();
			});
		},

		submit:function(){
			//is this valid?
			//if yes, show response
		},
		getFormValues:function(){
			//get all the form element values
		},

		showFeedback:function(){},

		hideFeedback:function(){},

		buildResponse:function(){},
			// build HTML to the container div
		},






}(jQuery));


