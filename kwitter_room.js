
var firebaseConfig = {
      apiKey: "AIzaSyAOIw85L0oHhOtrQ7BKlm9v-lbvhZVX_Ck",
      authDomain: "kwitter-65aa3.firebaseapp.com",
      databaseURL: "https://kwitter-65aa3-default-rtdb.firebaseio.com",
      projectId: "kwitter-65aa3",
      storageBucket: "kwitter-65aa3.appspot.com",
      messagingSenderId: "1038268907464",
      appId: "1:1038268907464:web:c36f1273eedabbcb278afd"
};


firebase.initializeApp(firebaseConfig);

username = localStorage.getItem("user_name_key");
document.getElementById("user_name").innerHTML = "Welcome " + username;

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  main_foldernames = childKey;
                  console.log(main_foldernames);
                  div_tag = '<div class="room_name" id="' + main_foldernames + '" onclick="redirecttoroom(this.id)">' + main_foldernames + '</div> <hr>';
                  document.getElementById("output").innerHTML += div_tag;

            });
      });
}
getData();

function addRoom() {
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose: "room creation"
      });
      localStorage.setItem("room_name_key", room_name);
      window.location = "kwitter_message.html";
}

function redirecttoroom(room_id) {
      localStorage.setItem("room_name_key", room_id);
      window.location = "kwitter_message.html";
}

function logout() {
      localStorage.removeItem("room_name_key");
      localStorage.removeItem("user_name_key");
      window.location = "index.html";
}