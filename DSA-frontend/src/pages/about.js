import React from "react";
import "../cssfile/about.css";
import img from "../images/WhatsApp Image 2023-10-17 at 12.05.57 AM.jpeg";

function Aboutme() {
  return (
    <>
      <>
        <div id="back1">
          <nav className="navMenu">
            <a href="/home">Home</a>
            <a href="/myclass">MyClass</a>
            <a href="/about">About</a>
            <a href="/result">MyResult</a>
          </nav>
          <section class="articles">
            <article>
              <div class="article-wrapper">
                <figure>
                  <img src="https://picsum.photos/id/1011/800/450" alt="" />
                </figure>
                <div class="article-body">
                  <h2>Aadish Jain</h2>
                  <p>220001001</p>
                </div>
              </div>
            </article>
            <article>
              <div class="article-wrapper">
                <figure>
                  <img src="https://picsum.photos/id/1005/800/450" alt="" />
                </figure>
                <div class="article-body">
                  <h2>Abhinav Gangil</h2>
                  <p>220001002</p>
                </div>
              </div>
            </article>
            <article>
              <div class="article-wrapper">
                <figure>
                  <img src="https://picsum.photos/id/103/800/450" alt="" />
                </figure>
                <div class="article-body">
                  <h2>Darshil Patel</h2>
                  <p>220001014</p>
                </div>
              </div>
            </article>
          </section>
        </div>
      </>
    </>
  );
}

export default Aboutme;
