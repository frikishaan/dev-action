# DEV Action

![Tests](https://github.com/sheikh005/dev-action/workflows/Tests/badge.svg)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6c6aad7063404e1d84341c809160a70d)](https://app.codacy.com/manual/sheikh005/dev-action?utm_source=github.com&utm_medium=referral&utm_content=sheikh005/dev-action&utm_campaign=Badge_Grade_Dashboard)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fsheikh005%2Fdev-action.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fsheikh005%2Fdev-action?ref=badge_shield)

This GitHub action posts a new article on [DEV](https://dev.to) whenever a new release has been published on GitHub.

## Usage

To use the action, Inside your `.github/workflows/dev.yml` file put the below code:

```yml
on:
  release:
    types: [published]

jobs:
  hello_world_job:
    runs-on: ubuntu-latest
    name: A job to post a article on DEV
    steps:
      # To use this repository's private action,
      # you must check out the repository
      - name: Checkout
        uses: actions/checkout@v2
      - name: Publish Release Update on DEV
        uses: sheikh005/dev-action # Uses an action in the root directory
        id: publish
        with:
          dev-to-secret: ${{ secrets.DEV_TO_TOKEN }}
          tags: "news,opensource,github" # Comma separted list of tags
      - name: Get the URL of the post
        run: echo "The URL of the POST is <${{ steps.publish.outputs.url }}>"
```

## Arguments

|      Input      |             Description             |
| :-------------: | :---------------------------------: |
| `dev-to-secret` | Used to authorize request to dev.to |
|     `tags`      |   Tags to associate with the post   |

The action returns a output `url`, which is the URL for the created post on dev.

## License

The code of this aciton released under the [MIT License](https://github.com/sheikh005/dev-action/blob/master/LICENSE).
