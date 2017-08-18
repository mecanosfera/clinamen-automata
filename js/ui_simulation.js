class SimulationUI {

  constructor(args){
    this.init(args);


  }

  init(args){
    this.simulation = args[0];
    this.size = args[1];
    this.grid = null;
    //this.grid.draw();

    this.library = $(".library");
    this.library.height($(document).innerHeight());
    this.worldsList = $("#worlds_list");
    this.selectedWorldLi = null;

    this.createLibrary();
    //alert("xxx");

  }


  createLibrary(){
    for(let w of this.simulation.worlds){
      var a = $('<a href="#" class="world_item">'+w.name+'<a>');
      var li = $('<li></li>');
      li.append(a);
      this.worldsList.append(li);
      a.click({self:this,sim:this.simulation,l:li},function(e){
        var sim = e.data.sim;
        var self = e.data.self;
        var lii = e.data.l;
        if(sim.world==null && sim.world!=w){
          sim.select(w);
          self.selectedWorldLi = lii;
          lii.addClass('selected');
        } else {
          self.selectedWorldLi.removeClass('selected');
          self.selectedWorldLi = lii;
          lii.addClass("selected");
          sim.select(w);
        }
      });
    }

    $("#next").click({self:this,s:this.simulation},function(e){
        if(!e.data.s.running){
          e.data.s.next();
        }
    });

    $("#play").click({self:this,s:this.simulation},function(e){
        e.data.s.play();
    });

    $("#stop").click({self:this,s:this.simulation},function(e){
        e.data.s.stop();
    });

    $("#speed").val(this.simulation.speed);

  }


  select(){
    this.grid = new Grid(this,"world_grid",this.simulation.size);
    this.draw();
  }

  draw(){
    this.grid.draw(this.simulation.world);
  }


}
