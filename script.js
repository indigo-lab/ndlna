if (!location.search.match(/^[?]([0-9]+)$/))
  location.search = "?00054222";

var id = RegExp.$1;

$.getJSON("./jsonld/" + id + ".json").then(function(json) {

  $("#main tr").hide();
  $("#id").show().find("td").text(id);
  $("#rdf").attr("href", "http://id.ndl.go.jp/auth/ndlna/" + id + ".rdf");
  $("#ttl").attr("href", "http://id.ndl.go.jp/auth/ndlna/" + id + ".ttl");
  $("#json").attr("href", "http://id.ndl.go.jp/auth/ndlna/" + id + ".json");
  $("#ndl").show().find("td").append($("<a/>", {
    href : "http://id.ndl.go.jp/auth/ndlna/" + id,
    target : "_blank"
  }).text("http://id.ndl.go.jp/auth/ndlna/" + id));

  $("#sameas").show().find("td").append($("<a/>", {
    href : json.sameAs,
    target : "_blank"
  }).text(json.sameAs));

  json.knows.forEach(function(a) {
    $("#knows").show().find("td").append($("<a/>", {
      href : "?" + a['@id'].replace("http://id.ndl.go.jp/auth/entity/", "")
    }).text(a.sameAs.replace("http://ja.dbpedia.org/resource/", ""))).append(" ");
  });

  var q2 = "select ?x where {<@> <http://www.w3.org/2000/01/rdf-schema#comment> ?x}";
  $.getJSON("http://ja.dbpedia.org/sparql", {
    query : q2.replace("@", json.sameAs),
    format : "application/sparql-results+json"
  }).then(function(w) {
    $("#comment").text(w.results.bindings[0].x.value);
  });

}).fail(function() {
  $("#comment").text("このリソースには対応する DBpedia リソースが設定されていないようです");
});

var tmpl = 'select ?p ?o where { ';
tmpl += '{<http://id.ndl.go.jp/auth/ndlna/@> ?p ?o.} union ';
tmpl += '{<http://id.ndl.go.jp/auth/entity/@> ?p ?o.} union ';
tmpl += '{<http://id.ndl.go.jp/auth/ndlna/@> <http://www.w3.org/2008/05/skos-xl#prefLabel> ?x. ?x ?p ?o.}}';
$.getJSON('http://overdose.azurewebsites.net/ndla.php', {
  query : tmpl.replace(/@/g, id)
}).then(function(json) {
  json.results.bindings.forEach(function(a) {
    var p = a.p.value;
    var o = a.o.value;
    $("[data-predicate='" + p + "']").each(function() {
      $(this).closest("tr").show();
      if (a.o.type == "uri")
        $(this).append($("<a/>", {
          href : o,
          target : "_blank"
        }).text(o));
      else
        $(this).append($("<span/>").text(o)).append(" ");
    });
  });
});

$(function() {
  $("form").on("submit", function() {
    var key = $("#search").val();
    if (!key || key.length == 0) {
      $("#result").html("<li>キーワードが空です</li>");
      return false;
    } else {
      $("#result").html("<li>おまちください</li>");

      var sparql2 = "select * where { ?s <http://xmlns.com/foaf/0.1/name> ?o . filter regex(?o ,'@') .} limit 10";
      $.getJSON('http://overdose.azurewebsites.net/ndla.php', {
        query : sparql2.replace("@", key)
      }).then(function(json) {
        var len = json.results.bindings.length;
        if (len == 0) {
          $("#result").html("<li>ヒットしませんでした</li>");
        } else {
          $("#result").html("<li>@ 件の結果を表示します</li>".replace("@", len));
          json.results.bindings.forEach(function(v) {
            var a = $("<a/>", {
              href : "?" + v.s.value.replace("http://id.ndl.go.jp/auth/entity/", "")
            }).text(v.o.value);
            $("#result").append($("<li/>").append(a));

          });
        }
        console.log(json);
      });

    }
    return false;
  });
});
