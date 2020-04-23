<!DOCTYPE html>

<html>
    <head>
        <title>Chatbot by Gregor</title>
        <link rel="shortcut icon" type="image/png" href="icons/favicon.png"/>
        <script src="script.js"></script>
        <script type="text/javascript" src="https://code.jquery.com/jquery-1.7.1.min.js"></script>
        <link rel="stylesheet" type="text/css" href="style.css">
    </head>
    <body>

        <div class="text" id="text">
            <p class="txt big">CHAT</p>
            <p class="txt big">BOT</p>
            <p class="txt norm">WEATHER</p>
        </div>

        <div class="chatbox">
            <div class="label">
                <div class="user"><img src="img/U.png"></div>
            </div>
            <div class="chat" id="chat">
                <p class="msg botgreet" id="greeting"></p>
                <!--<p class="msg self">Hello!</p>
                <p class="msg bot">What's up?</p>
                <p class="msg self">I wanted to ask you how do you feel about this situation?</p>
                <p class="msg bot">What do you mean?</p>
                <p class="msg self">Hello!</p>
                <p class="msg bot">What's up?</p>
                <p class="msg self">I wanted to ask you how do you feel about this situation? I wanted to ask you how do you feel about this situation? I wanted to ask you how do you feel about this situation? I wanted to ask you how do you feel about this situation?</p>
                <p class="msg bot">What do you mean?</p>-->
            </div>
            <div class="form">
                <input type="text" class="textbox" id="textbox" placeholder="Aa" disabled>
                <button onclick="myMsg()">>></button>
            </div>
        </div>

        <div class="popup" id="popup">
            <div class="top">
                <p class="title">Details</p>
                <button onclick="closePop()">X</button>
            </div>
            <div class="bottom">
                <img id="imgW" src="icons/01d.svg">
                <p class="temp" id="temp"></p>
                <p class="details" id="city"></p>
                <p class="details" id="hum"></p>
                <p class="details" id="prs"></p>
                <p class="details" id="wind"></p>
            </div>
        </div>

        <div class="yt" id="yt">
            <div class="top">
                <p class="titleYT">Music</p>
                <button onclick="minYT()">_</button>
                <button onclick="closeYT()">X</button>
            </div>
            <div class="bottom">
                <iframe id="video" width="400" height="225" src="https://www.youtube.com/embed/-fjmSE9Ez6w" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>

        <div class="start" id="start">
            <div class="heythere">Hey there!</div>
            <div class="clickthere">Click the button below to start the app.</div>
            <button onclick="runbot()">START</button>
        </div>
        <?php
            $conn = mysqli_connect("sql420.your-server.de", "yostae_2", "...", "yostae_db2");
            if($conn->connect_error) {
                die("Connection failed:".$conn->connect_error);
            }
            $sql = "SELECT id, name from WBdata";
            $result = $conn->query($sql);
            if($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    echo "<div class=" . "username" . " id=" . "username" . ">" . $row["name"] . "</div>";
                }
            }
            else {
                echo "0 result";
            }
            $conn-> close();
        ?>
    </body>
</html>