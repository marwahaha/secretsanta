//Stuff to make emailing work via Google API
var CLIENT_ID = '<your client id here>';
var SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

/** * Check if current user has authorized this application. */
function checkAuth() {
    gapi.auth.authorize({
        'client_id': CLIENT_ID,
        'scope': SCOPES.join(' '),
        'immediate': true
    }, handleAuthResult);
}
/* Handle response from authorization server. */
function handleAuthResult(authResult) {
    var authorizeDiv = document.getElementById('authorize-div');
    if (authResult && !authResult.error) {
        // Hide auth UI, then load client library.
        authorizeDiv.style.display = 'none';
        loadGmailApi();
    } else {
        // Show auth UI, allowing the user to initiate authorization by
        // clicking authorize button.
        authorizeDiv.style.display = 'inline';
    }
}
/* Initiate auth flow in response to user clicking authorize button.*/
function handleAuthClick(event) {
    gapi.auth.authorize({
            client_id: CLIENT_ID,
            scope: SCOPES,
            immediate: false
        },
        handleAuthResult);
    return false;
}
/** Load Gmail API client library. List labels once client library is loaded.*/
function loadGmailApi() {
    gapi.client.load('gmail', 'v1', doNothing);
}
function doNothing() {};

/* Emailing */
function sendMessage(to, assign) {
    email = 'From: Kunal <kmarwahaha@gmail.com>\r\nTo: ' + to + '\nSubject: Your Secret Santa Assignment is...' + assign + '!!\nDate: Fri, 21 Nov 1997 09:55:06 -0600\nMessage-ID: <1234@local.machine.example>\n\nGood luck.\n';
    base64EncodedEmail = btoa(email).replace(/\//g, '_').replace(/\+/g, '-');
    request = gapi.client.gmail.users.messages.send({
        'userId': "me",
        'resource': {
            'raw': base64EncodedEmail
        }
    });
    request.execute();
}
function sendEmails() {
    i = 0
    while (i < matches.length) {
        sendMessage(matches[i][1][1].toString(), matches[i][0][0].toString());
        i += 1;
    }
}