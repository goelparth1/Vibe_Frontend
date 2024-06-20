
import  PostCard  from "../components/PostCard";
// import  UserCard  from "./UserCard";
import { useGetRecentPosts } from "../../lib/tanstackquery/mutations";

const Home = () => {
  // const { toast } = useToast();

  const {
    data: posts,
    isPending: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();
 
console.log(posts);
  if (isErrorPosts ) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isPostLoading && !posts ? (
            <img
            src = "/assets/images/Loading.svg"
            alt = 'loading' 
            className = ' h-full object-cover ml-1 '/>
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full ">
              {posts.map((post: any) => (
                <li key={post._id} className="flex justify-center w-full">
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>

      
  );
};

export default Home;
