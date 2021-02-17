
import { NavBar } from "../components/NavBar";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";

const Index = () => {
  const [{data}] = usePostsQuery();
  return (
    <>
      <NavBar></NavBar>
      {!data ? <div>loading...</div> : data.posts.map((p) => <div key={p.id}>{p.title}</div>)}
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Index); // sets up everything for ssr rendering. for rendering to happen, as a second argument there must be ,{ssr: true}
// the initial page next.js loads is going to be server-side rendered, next are not (client side rendering)