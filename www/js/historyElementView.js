

define([
  'jquery',
  'underscore',
  'backbone',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'jquerymobile'
  
], function($, _, Backbone){


  historyElementView = Backbone.View.extend({
  
	tagName: 'li',
	
    render: function(index, history){
	this.$el.attr('data-theme', 'c');
	this.$el.attr('data-icon', 'false');
	this.$el.attr('style', 'background:none;');

	element = "                 <a data-transition='none' class='toolbutton'>                                  </a> 				<p class='fechasummarytools'> 11/3/2013 &nbsp; 22:12 </p>";

    compiledTemplate = _.template( element );
		
	neoindex=index+20;

			
	this.$el.empty().append("<p class='fechasummarytools'>"+this.model.get("date")+"</p><a data-transition='none' class='toolbutton'></a><a data-icon='delete' class='deleteEntry elementosfinos' colIndex='"+index+"' data-rel='dialog'' data-transition='none'>Delete</a>");

	
		switch(this.model.get("tool")){
		
		case 'quad':
		
			this.$(".toolbutton").append(history.get("languages").get("dic_quad_header"));
			this.$(".toolbutton").attr('class', 'quad toolbutton');	
			this.$(".toolbutton").attr('href', "#quadcheck" + neoindex);
		    break;
			
		case 'feeling':

			this.$(".toolbutton").append(history.get("languages").get("dic_feeling_header"));
			this.$(".toolbutton").attr('class', 'feeling toolbutton');
			this.$(".toolbutton").attr('href', "#feeling" + neoindex);
			break;
			
		case 'bashaker':
		
			this.$(".toolbutton").append(history.get("languages").get("dic_bash_header"));
			this.$(".toolbutton").attr('class', 'bashacker toolbutton');
			this.$(".toolbutton").attr('href', "#bashacker" + neoindex);
		    break;
			
		case 'transference':
		
			this.$(".toolbutton").append(history.get("languages").get("dic_transf_header"));
			this.$(".toolbutton").attr('class', 'transfer toolbutton');
			this.$(".toolbutton").attr('href', "#transference" + neoindex);
		    break;
		
		case 'journal':
		
			this.$(".toolbutton").append(history.get("languages").get("dic_journal_header"));
			this.$(".toolbutton").attr('class', 'history toolbutton');
			this.$(".toolbutton").attr('href', "#journal" + neoindex);
		    break;
			
		case 'beatyour':
		
			this.$(".toolbutton").append(history.get("languages").get("dic_beatyour_header"));
			this.$(".toolbutton").attr('class', 'beatyour toolbutton');
			this.$(".toolbutton").attr('href', "#beatyourdark" + neoindex);
		    break; 
			
		case 'vicious':
		
			this.$(".toolbutton").append(history.get("languages").get("dic_vicious_header"));
			this.$(".toolbutton").attr('class', 'vicious toolbutton');
			this.$(".toolbutton").attr('href', "#vicious" + neoindex);
		    break;
		
		case 'recycling':
		
			this.$(".toolbutton").append(history.get("languages").get("dic_recycling_header"));
			this.$(".toolbutton").attr('class', 'recycling toolbutton');
			this.$(".toolbutton").attr('href', "#recycling" + neoindex);
		    break;
			
		case 'meditation':
		
			this.$(".toolbutton").append(history.get("languages").get("dic_meditations_header"));
			this.$(".toolbutton").attr('class', 'vicious toolbutton');
			this.$(".toolbutton").attr('href', "#meditations" + neoindex);
		    break;
			
		case 'vision':
		
			this.$(".toolbutton").append(history.get("languages").get("dic_vision_header"));
			this.$(".toolbutton").attr('class', 'visionboard toolbutton');
			this.$(".toolbutton").attr('href', "#visionboard" + neoindex);
		    break;

	
	}
	
}

  });

   return historyElementView;
});

