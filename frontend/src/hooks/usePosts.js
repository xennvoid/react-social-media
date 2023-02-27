import { useInfiniteQuery } from "react-query"
import { sendRequest } from "../requestPattern"

const usePosts = (name, userId, dependencies) => {

    const getPosts = async (pageParam = 0) => {
        const res = await sendRequest(`posts/user/${userId}?limit=5&offset=${pageParam}`)
        if (res.status == 204)
            return null
        return res.data
    }

    return useInfiniteQuery([name, ...dependencies], ({ pageParam = 0 }) => getPosts(pageParam),
        {
            getNextPageParam: (lastPage) =>
                lastPage?.posts?.length >= 5 ? lastPage.offset : undefined,
        }
    )
}

export default usePosts;