var selector = document.body.appendChild (
    document.createElement ( 'input' )
)
selector.type = 'file'
selector.multiple = true
selector.id = 'selectImages'
selector.style.display = 'none'

var label = document.body.appendChild (
    document.createElement ( 'label' )
)
label.htmlFor = 'selectImages'
label.innerText = 'Select images'

var promise = function ( imageFile ) {
    return new Promise ( function ( resolve, reject ) {
        if (imageFile.type.indexOf("image/") !== 0) 
            reject( "Выбранный файл не является изображением" )
        else
            resolve(imageFile)
    })
}

selector.onchange = function ( event ) {
    for ( var file of event.target.files ) {
        promise ( file )
            .then ( res => {
                var picture = document.createElement ( "img" )
                document.body.appendChild( picture )
                picture.width = "150"

                var reader = new FileReader()

                reader.onload = function ( event ) {
                    picture.src = event.target.result
                }
                reader.readAsDataURL ( res )
            })
            .catch ( error => console.error ( error ) )
    }
}