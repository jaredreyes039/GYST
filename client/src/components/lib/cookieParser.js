export function CookieParser(name){

    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));

    if (match) {
      return(match[2]);
    }

    else{
         return('--something went wrong---');
    }

}
