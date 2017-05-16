import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {

  constructor(...args) {
    super(...args);
  }

  render() {
    return (
      <div>
        <div className="posts">
          <section className="post">
            <header className="post-header">
              <h2 className="post-title">Programa de Mentorados de Engenharia Informática - FEUP</h2>
            </header>
            <div className="post-description">
              <p>Now that we know who you are, I know who I am. I"m not a mistake! It all makes sense! In a comic, you know how you can tell who the arch-villain"s going to be? He"s the exact opposite of the hero. And most times they"re friends, like you and me! I should"ve known way back when... You know why, David? Because of the kids. They called me Mr Glass.</p>
              <p>Look, just because I don"t be givin" no man a foot massage don"t make it right for Marsellus to throw Antwone into a glass motherfuckin" house, fuckin" up the way the nigger talks. Motherfucker do that shit to me, he better paralyze my ass, "cause I"ll kill the motherfucker, know what I"m sayin"?</p>
              <p>The access to this page is exclusive to students enrolled in FEUP"s magical pony training club. If you have a <code>fe.up.pt</code> email, go ahead and <Link to="/signup">sign up</Link>.</p>
            </div>
          </section>
        </div>
      </div>
    );
  }

}

export default Home;
