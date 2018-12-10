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
            reject("Выбранный файл не является изображением")
        else{
            var reader = new FileReader()
            var sourse
            reader.readAsDataURL ( imageFile )
            reader.onload = function ( event ) {
                sourse = event.target.result
                console.log("sourse: ", sourse)
                resolve(sourse)
            }
        }
    })
}

selector.onchange = function ( event ) {
    for ( var file of event.target.files ) {
        promise ( file )
            .then ( result => {
                console.log("result: ", result)
                var picture = document.createElement ( "img" )
                document.body.appendChild( picture )
                picture.src = result
                picture.width = "150"
            })
            .catch ( error => console.error ( error ) )
    }
}