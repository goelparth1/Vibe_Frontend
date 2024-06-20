
import  PostCard  from "../components/PostCard";
import  UserCard  from "./UserCard";
import { useGetRecentPosts,useGetUsers } from "../../lib/tanstackquery/mutations";

const Home = () => {
  // const { toast } = useToast();

  const {
    data: posts,
    isPending: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();
  const {
    data: creators,
    isPending: isUserLoading,
    isError: isErrorCreators,
  } = useGetUsers(10);

  if (isErrorPosts || isErrorCreators) {
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

      <div className="home-creators">
        <h3 className="h3-bold text-light-1">Top Creators</h3>
        {isUserLoading && !creators ? (
          <img
          src = "/assets/images/Loading.svg"
          alt = 'loading' 
          className = ' h-full object-cover ml-1 '/>
        ) : (
          <ul className="grid 2xl:grid-cols-2 gap-6">
            {creators?.documents.map((creator:any) => (
              <li key={creator._id!}>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
