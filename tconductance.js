document.addEventListener("DOMContentLoaded", function(event) {
    document.querySelector('#Results').classList.remove('unhidden');
});


jQuery(document).ready(function() {

    jQuery('#mselDB').click(openDB);
    parse( location.hash );
    setTimeout(function(){
        calPen()
    }, 0);

    $( '.calculator_divs input' ).each( function () {
        // Check each input box
        h = location.hash // Set hash has from URL

        var t = $(this) //
        var v = t.val() // input box value
        var p = t.attr( 'name' )

        if( h.indexOf( p + '_' ) > -1){ // Check if input field's property is in the hash

            t.val( hObj[p] ) //Set the input box value to the URL hash value
        }

        t.keyup(function() {

            t = $(this)

            v = t.val()



            if(isNaN(v)) {
                v = v.substring(0, (v.length - 1))
                t.val(v)
            }

            p = t.attr( 'name' )
            hObj[decodeURIComponent(p)] = v ? decodeURIComponent(v) : null
            hTemp = ''
            r(v, p) // Remove property from object if there is no value in input field
            for (var prop in hObj) {
                hTemp += ","+prop + "_" + hObj[prop] // Create hash string
            }
            location.hash = hTemp //Set the location hash
            hTemp == '' && history.pushState( '', document.title, window.location.pathname ) // If location hash is empty, remove #
            calPen()
        })
    });

});

function openDB() {
    var xin = '../materials-database-popup/'
    window.addEventListener('message', function(event) {
        var receivedArray = event.data;
        document.getElementById("tcinput").value = parseFloat(receivedArray[1]);
    });
    newwin(xin, 'databasepopup',"mselDB")
}

function newwin(file, window) {
 childWindow = open(file, window, 'resizable=no,toolbar=no,location=no,status=no,menubar=no,directories=no,width=850,height=600');
 // childWindow.setAttribute('id', 'win' + varp)
 if (childWindow.opener == null) childWindow.opener = self;
 return true;
}

function parse( q ) {

    hObj = {}
    qPos = q.indexOf( '#' )

    tokens = q.substr( qPos + 1 ).split( ',' )

    i = tokens.length - 1

        if ( qPos !== -1 || q.indexOf( '_' ) !== -1 ) {
            for (; i >= 0; i--) {
            var s = tokens[i].split( '_' )

            hObj[decodeURIComponent(s[0])] = s.hasOwnProperty(1) ? decodeURIComponent(s[1]) : null
        }
    }

    return hObj
}

function calPen() {
    if (hObj['tcinput'] && hObj['thickinput'] && hObj['thickunit']) {
        console.log(hObj['thickunit']);
        $('#thickunit').val(hObj['thickunit']);
        $('#singleBtn').trigger('click');
    }
}

function r(v, p) {
    v === '' && delete hObj[decodeURIComponent(p)] // Remove property from hashes object
}

function Calculate(x, y, z) {  //tcinput, thickness value, unit //
        if (x != "" || y != "" || z !=""){
            location.hash = "tcinput_" + x + ",thickinput_"+ y + ",thickunit_"+ z;

            var thick;
            switch (z){
                case 'mm': thick = y/1000;
                break;
                case 'cm': thick = y/100;
                break;
                case 'in': thick = y * 0.0254;
                break;
            }
            var result;

            result = x/thick;
            document.getElementById('result').value = (result).toFixed(2);
            document.querySelector('#Results').classList.add('unhidden');

        }
}


