$(document).ready(function() {

  var counter = 0;

  // make element draggable
  $('.drag').draggable({
    helper:'clone',
    containment: 'frame',

    // when first dragged
    stop: function(ev, ui) {
      var pos = $(ui.helper).offset();
      objName = '#clonediv' + counter;
      $(objName).css({'left': pos.left, 'top': pos.top});
      $(objName).removeClass('drag');

      // when existing object is dragged
      $(objName).draggable({
        containment: 'parent',
        stop: function(ev, ui) {
          var pos = $(ui.helper).offset();
          console.log($(this).attr('id'));
          console.log(pos.left);
          console.log(pos.top);
        }
      });
    }
  });

  // make element droppable
  $('#frame').droppable({
    drop: function(ev, ui) {

      // for elements with 2-digit id
      if (ui.helper.attr('id').search(/drag[0-9][0-9]/) !== -1) {
        counter += 1;
        var element = $(ui.draggable).clone();
        element.addClass('tempclass');
        $(this).append(element);
        $('.tempclass').attr('id','clonediv' + counter);
        $('#clonediv' + counter).removeClass('tempclass');

        // get the dynamic item id
        var draggedNumber = ui.helper.attr('id').search(/drag([0-9][0-9])/);
        var itemDragged = 'dragged' + RegExp.$1;
        console.log(itemDragged);

        $('#clonediv' + counter).addClass(itemDragged);
        $('#clonediv' + counter).dblclick(function() {
          this.remove();
        });
      }

      // for elements with 1-digit id
      else if (ui.helper.attr('id').search(/drag[0-9]/) !== -1) {
        counter += 1;
        var element = $(ui.draggable).clone();
        element.addClass('tempclass');
        $(this).append(element);
        $('.tempclass').attr('id','clonediv' + counter);
        $('#clonediv' + counter).removeClass('tempclass');

        // get the dynamic item id
        var draggedNumber = ui.helper.attr('id').search(/drag([0-9])/);
        var itemDragged = 'dragged' + RegExp.$1;
        console.log(itemDragged);

        $('#clonediv' + counter).addClass(itemDragged);
        $('#clonediv' + counter).dblclick(function() {
          this.remove();
        });
      }

    }
  });

  $('#clear').click(function() {
    $('#frame').empty();
  });
  
});