export type LanguageStatistics = {
    name: string
    color: string
    size: number
};

export const fetchRepoStatistics = async (): Promise<LanguageStatistics[]> => {

    const EXCLUDE_LANGUAGES = ['Objective-C', 'CMake', 'Kotlin', 'Ruby', 'Swift'];

    const result = await fetch('https://api.github.com/graphql', {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`
        },
        body: JSON.stringify({
            "query": `{
              user(login: "lucassouza16") {
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
    }).then(e => e.json())
        .then(e => {
            console.log(e);
            
            const data = e.data.user.repositories.nodes;

            const languages = data.reduce((prev: any[], current: any) => {
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
            }, []).sort((a: any, b: any) => b.size - a.size);

            return languages;
        });

    return result;
};