export type LanguageStatistics = {
    name: string
    color: string
    size: number
};

export type Statistics = {
    name: string
    user: string
    avatar: string
    followers: number
    following: number
    languages: LanguageStatistics[]
}

export const fetchRepoStatistics = async (): Promise<Statistics> => {

    const EXCLUDE_LANGUAGES = ['Objective-C', 'CMake', 'Kotlin', 'Ruby', 'Swift'];

    const result = await fetch('https://api.github.com/graphql', {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`
        },
        body: JSON.stringify({
            "query": `{
              user(login: "${process.env.GITHUB_LOGIN}") {
               followers {totalCount}
               following {totalCount}
               name, login, avatarUrl
               repositories(first: 100, isFork: false) {
                 nodes {
                  name
                  languages(first: 10) {
                  edges {
                    node {color, name}
                    size
                  }
                }
              }
            }
          }
        }`
        })
    }).then(e => e.json()).then(e => e.data);

    return {
        name: result.user.name,
        user: result.user.login,
        avatar: result.user.avatarUrl,
        followers: result.user.followers.totalCount,
        following: result.user.following.totalCount,
        languages: result.user.repositories.nodes.reduce((prev: any[], current: any) => {
            return [...prev, ...current.languages.edges];
        }, []).reduce((prev: any[], { node: { name, color }, size }: any) => {

            if (EXCLUDE_LANGUAGES.indexOf(name) !== -1) return prev;

            let actual = prev.find(e => e.name === name);

            if (actual == null) {
                actual = { name, color, size };

                prev.push(actual);
            } else {
                actual.size += size;
            }

            return prev;
        }, []).sort((a: any, b: any) => b.size - a.size)
    }
}