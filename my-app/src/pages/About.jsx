import Layout from "../components/Layout";

export default function About() {
  return (
    <>
      <Layout>
        <div className="bg-white flex main_container ">
          <div className="about_image">
            <img src="/src/images/postin.png" alt=""/>
          </div>
          <div className="w-800">
            <h1 className="font-bold text-gray-600 text-3xl">It's about page.</h1>
            <p className="text-gray-500 mt-5 justify-center ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
              eaque quis et adipisci in ab, similique animi eum asperiores
              pariatur voluptas eligendi unde incidunt! Officiis saepe, quam
              neque fuga minus voluptatibus quia numquam autem temporibus optio
              aliquam eaque reiciendis libero inventore reprehenderit sed
              provident. <br /> Iure vel aliquid reiciendis sunt maxime unde. Provident
              dicta, fuga debitis itaque aspernatur eos minima! <br /> Consectetur
              molestias dolore earum! Neque error sapiente eligendi possimus
              maxime voluptate placeat, adipisci cupiditate a qui, libero
              molestias! Animi voluptate culpa saepe odio at, molestiae
              accusamus praesentium hic, id debitis distinctio, explicabo
              doloribus qui quo nihil tempore et error vero enim.
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
}
