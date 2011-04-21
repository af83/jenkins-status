(function(win, $) {
  // keeping an index for each project.
  var nbInstance = 0;

  /**
   * Use to watch a project state on jenkins
   */
  win.JenkinsState = function JenkinsState(options) {

    var numInstance = nbInstance++;

    // prepare our html report window.
    var content = $('<div style="position:fixed;left:0;bottom:' + 70 * numInstance + 'px;right:0;width:180px;height:55px;background:rgba(255,255,255,0.9);padding:5px;text-align:center;border-radius:5px;border:1px solid #666;"><h1 style="margin:0;font:bold 12px/20px Arial;color:#666;">' + options.project + '</h1><a class="build" target="_blank"><img class="color" style="border:none"/><img class="weather" style="border:none"/></a></div>');
    $('body').append(content);

    var color   = content.find('.color');
    var weather = content.find('.weather');
    var build   = content.find('.build');

    // to change current image state from data.
    function refresh(data) {
        color.attr('src', "http://" + options.host + "/static/8caf2d87/images/32x32/" + data.color + ".gif");
        weather.attr('src', "http://" + options.host + "/static/8caf2d87/images/32x32/" + data.healthReport[0].iconUrl);
        build.attr('href', "http://" + options.host + "/job/" + options.project + "/lastBuild");
    }

    // to query the api for state.
    function query() {
      $.ajax({
        url: "http://" + options.host + "/job/" + options.project + "/api/json",
        dataType: "jsonp",
        jsonp: 'jsonp',
        success: function(data) {
          refresh(data)
        }
      });
    }

    // ask the state to jenkins.
    query();
  }
})(window, jQuery);
