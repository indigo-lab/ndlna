# ndlna

このレポジトリは [国立国会図書館のデータを使い尽くそうハッカソン](http://lab.ndl.go.jp/cms/?q=hack2015) のために作成した
データセットおよび Web アプリケーションの公開を目的としています。


* 本レポジトリで公開しているデータセットは **Web NDL Authorities の外部提供インタフェース** を用いて作成されました
* 本レポジトリで公開している Web アプリケーションは **Web NDL Authorities の外部提供インタフェース** を使用しています
* 本レポジトリで公開しているデータセットおよび Web アプリケーションには、個別のファイル内で記載がない限り [LICENSE](https://github.com/indigo-lab/ndlna/blob/master/LICENSE) が適用されます


## 1. sameAs リンクセット

Web NDL Authorities の foaf:Person のインスタンスと DBpedia Japanese のリソースとを owl:sameAs で結ぶリンクセットです。

* <https://github.com/indigo-lab/ndlna/blob/master/sameas.nt.gz>

2016-02-10 作成 53,496 Triples


## 2. knows リンクセット

Wikipedia (Japanese) 上のページ間のリンク関係を
Web NDL Authorities の foaf:Person の間の「知人」関係であると見なして foaf:knows で結ぶリンクセットです。

* <https://github.com/indigo-lab/ndlna/blob/master/knows.nt.gz>

2016-02-10 作成 505,776 Triples

## 3. Web アプリケーション

Web NDL Authorities のページを模したデモアプリケーションです。
本家のページで表示されている情報に加えて、
DBpedia Japanese の SPARQL Endpoint から得られる説明、
「知人」関係のリンクが付与されています。

* <http://indigo-lab.github.io/ndlna/>

## 技術情報

[Wiki](https://github.com/indigo-lab/ndlna/wiki) で公開予定




