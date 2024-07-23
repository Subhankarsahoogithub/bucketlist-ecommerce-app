import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.png
            "
            alt="contact us"
            style={{ width: "80%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            Inspired from this legendary movie "The Bucket List" .This movie
            teaches us our life has to be memoreble not long,
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
