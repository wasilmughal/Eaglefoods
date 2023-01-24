var email = document.getElementById("userName")
var password = document.getElementById("pwd")
var signup = document.getElementById("btns")
var signin = document.getElementById("btnl")
// var admin = document.getElementById("admin").value
var role = document.getElementsByName("role")
var getrole=""
signup.addEventListener("click", function () {
    event.preventDefault()
    console.log(email.value)
    console.log(password.value)
    for (var i = 0; i < role.length; i++) {
        if (role[i].checked) {
            getrole = role[i].value
            break
        }0
    }
    if (getrole == "") {
        alert("select role")
    }
    else {
        console.log(getrole)
    }

    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then(async (userdata) => {
            console.log(userdata.user.uid)

            var obj = {

                email: email.value,
                password: password.value,
                role: getrole,
                USER_UID: userdata.user.uid
            }

            await firebase.database().ref(`${getrole.toString()}/`)
            .child(userdata.user.uid.toString()).set(obj)
            alert("user reg")

        })
        .catch((err) => {
            // console.log(err)
            alert(err)
        })
})


signin.addEventListener("click", function () {
    event.preventDefault()
    console.log(email.value)
    console.log(password.value)
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((userdata) => {
            console.log(userdata.user.uid)
            firebase.database().ref("Admin/").child(userdata.user.uid)
            .once("value", (snap) => {
                console.log(snap.toJSON())
                if (snap.toJSON() == null) {
                    firebase.database().ref("user/").child(userdata.user.uid).once("value", (snap) => {
                        console.log(snap.toJSON())
                        window.location.replace("user.html");  
                    })
                }
                else {
                    console.log("Admin panel")
                    
                    window.location.replace("adddish.html");

                }
            })
        })
        .catch((err) => {
            console.log(err.code)
            alert(err)
        })
})