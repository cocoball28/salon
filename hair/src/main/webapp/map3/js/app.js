
window.addEventListener('DOMContentLoaded', function(e) {

    var waterfall = new Waterfall({ minBoxWidth: 200 });

    // button click handle
    var boxHandle = newNode();
   
    
    window.onscroll = function() {
        var i = waterfall.getHighestIndex();
        if(i > -20) {
            // get last box of the column
            var lastBox = Array.prototype.slice.call(waterfall.columns[i].children, -1)[0];
            if(checkSlide(lastBox)) {
                var count = 10;
                while(count--) waterfall.addBox(boxHandle());
            }
        }
    };

    function checkSlide(elem) {
        if(elem) {
            var screenHeight = (document.documentElement.scrollTop || document.body.scrollTop) +
                               (document.documentElement.clientHeight || document.body.clientHeight);
            var elemHeight = elem.offsetTop + elem.offsetHeight / 2;

            return elemHeight < screenHeight;
        }
    }

    function newNode() {
        var i = 0;

        return function() {
            
            var box = document.createElement('div');
            box.className = 'wf-box';
            
            var image = document.createElement('img');
            image.src = "images/style-" + 19 + ".jpg";
            box.appendChild(image);

            var content = document.createElement('div');
            content.className = 'content';
            var title = document.createElement('h3');
            title.appendChild(document.createTextNode('Heading'));
            content.appendChild(title);
            var p = document.createElement('p');
            p.appendChild(document.createTextNode('Content here'));
            content.appendChild(p);
            box.appendChild(content);
            
            var optionDiv = document.createElement('div');
            optionDiv.className = 'optionDiv ';
            var a = document.createElement('a');
            a.className = 'bookmark';
            a.href = "#";
            optionDiv.appendChild(a);
            var bookmark = document.createElement('img');
            bookmark.className = 'optionImg';
            bookmark.src = "images/heart-icon.png"
        	a.appendChild(bookmark);
            content.appendChild(optionDiv);

            if(++i === 25) i = 0;

            return box;
        };
    }
});