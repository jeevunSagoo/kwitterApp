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
user_name = localStorage.getItem("user_name_key");
room_name = localStorage.getItem("room_name_key");


function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        subfolder_name = childKey;
                        subfolder_data = childData;
                        db_name = subfolder_data["name"];
                        db_message = subfolder_data["message"];
                        db_likes = subfolder_data["like"];
                        nametag = '<h4>' + db_name + '<img src="tick.png" class="user_tick"></h4>';
                        message_h4 = '<h4 class="message_h4">' + db_message + '</h4>';
                        btnstarttag = '<button class="btn btn-warning" id="' + subfolder_name + '" onclick="increaselikes(this.id)" value="' + db_likes + '">';
                        btntexttag = '<span class="glyphicon glyphicon-thumbs-up" >Like:' + db_likes + '</span></button><hr>';
                        document.getElementById("output").innerHTML+=nametag+message_h4+btnstarttag+btntexttag;
                  }
            });
      });
}
getData();

function increaselikes(sub_name){
      likes=document.getElementById(sub_name).value;
      likes=Number(likes)+1;
      firebase.database().ref(room_name).child(sub_name).update({
            like:likes
      });
}

function logout() {
      localStorage.removeItem("room_name_key");
      localStorage.removeItem("user_name_key");
      window.location = "index.html";
}

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0
      });
      document.getElementById("msg").value = "";
}