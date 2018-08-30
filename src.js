// All we need.
window.sessionStorage.setItem('hiddens', '');
window.sessionStorage.setItem('hidingsomethingalready', '');
window.sessionStorage.setItem('previousattribute', '');

addHideClassToPage();
addHideEventListenerToPage();
addUndoEventListenerToPage();
addHighlightDivEventListenerToPage();
addRemoveHighlightDivEventListenerToPage();



function addHideEventListenerToPage()
{
    window.addEventListener('click', function (e) {

        if (e.target.tagName.toLowerCase() === 'body')
        {
            return;
        }


        if (e.ctrlKey && e.shiftKey)
        {
            e.preventDefault();
            e.stopPropagation();

            if (e.detail === 2)
            {

                if (window.sessionStorage.getItem('hidingsomethingalready') === 'true')
                {
                    return;
                }


                window.sessionStorage.setItem('hidingsomethingalready', 'true');



                var elmtohide = e.target;

                while (elmtohide.classList.contains('hidden_1_2_3'))
                {
                    elmtohide = elmtohide.parentNode;
                }

                elmtohide.classList.add('hidden_1_2_3');

                pushLocalStorageArray('hiddens', elementUniqueId(elmtohide));
            }
        }
        window.sessionStorage.setItem('hidingsomethingalready', '');
        return
    });
}



function addHighlightDivEventListenerToPage()
{
    window.addEventListener('mouseover', function (e) {
        removeLastHighlight();
        if (e.target.tagName.toLowerCase() === 'body')
        {
            return;
        }

        if (e.ctrlKey && e.shiftKey)
        {
            addHighlight(e.target);
        }
        return
    });
}



function addRemoveHighlightDivEventListenerToPage()
{
    window.addEventListener('mouseout', function (e) {
        removeLastHighlight();
    });

    window.addEventListener('keyup', function (e) {
        removeLastHighlight();
    });
}



function addHighlight(tohighlight)
{
    if (tohighlight.tagName.toLowerCase() === 'img')
    {
        window.sessionStorage.setItem('previousattribute', tohighlight.style.opacity);
        tohighlight.style.opacity = 0.6;
    }
    else
    {
        window.sessionStorage.setItem('previousattribute', tohighlight.style.backgroundColor);
        tohighlight.style.backgroundColor = "rgba(0,0,255,.1)";
    }
    tohighlight.classList.add('its_been_highlighted');
}



function removeLastHighlight()
{
    var thehighlighted = document.querySelector('.its_been_highlighted');

    if ( ! thehighlighted)
    {
        return;
    }

    if (thehighlighted.tagName.toLowerCase() === 'img')
    {
        thehighlighted.style.opacity = window.sessionStorage.getItem('previousattribute');
    }
    else
    {
        thehighlighted.style.backgroundColor = window.sessionStorage.getItem('previousattribute');
    }
    thehighlighted.classList.remove('its_been_highlighted');
}



function addUndoEventListenerToPage()
{
    window.addEventListener('keydown', function (e) {
        if (e.ctrlKey  && e.shiftKey )
        {

            if (e.keyCode == 90)
            {
                e.preventDefault();
                e.stopPropagation();

                var theid  = popLocalStorageArray('hiddens');

                if (theid)
                {
                    var toshow = document.getElementById(theid);
                    toshow.classList.remove('hidden_1_2_3');
                }
            }
            else
            {
                var n = document.querySelectorAll(":hover");
                addHighlight(n.item(n.length - 1));
            }
        }
    });
}



function elementUniqueId(element)
{
    var result = '';
    if (element.hasAttribute('id') && element.getAttribute('id') !== '')
    {
        result = element.getAttribute('id');
    }
    else
    {
        var newid = createDOMUniqueId();
        element.setAttribute('id', newid);
        element.id = newid;

        result = newid;
    }


    return result;
}



function createDOMUniqueId()
{
    var result = 'hde';

    while(document.getElementById(result))
    {
        result += Math.floor(Math.random() * 100 + 1);
    }

    return result;
}



function addHideClassToPage()
{
    var sss = document.createElement('style');
    var txx = document.createTextNode('.hidden_1_2_3 { display: none !important; }');

    sss.appendChild(txx);
    document.head.appendChild(sss);

    document.getElementsByTagName('head')[0].appendChild(sss);
}



function pushLocalStorageArray(key, value)
{
    var vvv = window.sessionStorage.getItem(key).split(',');
    vvv.push(value);
    window.sessionStorage.setItem(key, vvv.join(','));
}



function popLocalStorageArray(key)
{
    var ppp = window.sessionStorage.getItem(key);
    ppp = ppp.split(',');
    popped  = ppp.pop();
    window.sessionStorage.setItem(key, ppp.join(','));
    return popped;
}
