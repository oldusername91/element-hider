// All we need.
window.sessionStorage.setItem('hiddens', '');
window.sessionStorage.setItem('hidingsomethingalready', '');

addHideClassToPage();
addHideEventListenerToPage();
addUndoEventListenerToPage();


function addHideEventListenerToPage()
{
    window.addEventListener('click', function (e) {
        if (e.ctrlKey && e.shiftKey)
        {
            if (e.detail === 2)
            {

                if (window.sessionStorage.getItem('hidingsomethingalready') === 'true')
                {
                    return;
                }


                window.sessionStorage.setItem('hidingsomethingalready', 'true');

                pushLocalStorageArray('hiddens', elementUniqueId(e.target));

                e.target.classList.add('hidden_1_2_3');
            }
        }
        window.sessionStorage.setItem('hidingsomethingalready', '');
        return
    });
}


function addUndoEventListenerToPage()
{
    window.addEventListener('keyup', function (e) {
        if (e.keyCode == 90 && e.ctrlKey  && e.shiftKey )
        {
            var theid  = popLocalStorageArray('hiddens');

            if (theid)
            {
                var toshow = document.getElementById(theid);
                toshow.classList.remove('hidden_1_2_3');
            }
        }
        return;
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
    var txx = document.createTextNode('.hidden_1_2_3 { display: none; }');

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
