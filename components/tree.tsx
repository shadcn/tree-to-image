import { Tree } from "types"

interface TreeProps {
  tree: Tree
  width: number
  height: number
}

export function Tree({ tree, width, height }: TreeProps) {
  return (
    <div
      style={{
        backgroundColor: "#fafafa",
        width: `${width}px`,
        height: `${height}px`,
        padding: "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          borderRadius: "15px",
          overflow: "hidden",
          backgroundColor: "#ececec",
          width: "600px",
        }}
      >
        <TreeItems tree={tree} level={0} />
      </div>
    </div>
  )
}

interface TreeItemsProps {
  tree: Tree
  level: number
}

export function TreeItems({ tree, level = 0 }: TreeItemsProps) {
  if (!tree?.items) {
    return null
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      {tree.items?.map((item, index) => {
        const isFolder = item?.items?.length > 0
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
            key={index}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                marginBottom: "1px",
                padding: "36px",
                height: "90px",
                minWidth: "540px",
                justifyContent: "flex-start",
                lineHeight: 1,
                fontSize: "36px",
                backgroundColor: "white",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "54px",
                  width: "100%",
                  paddingLeft: `${level * 60}px`,
                }}
              >
                {isFolder ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      marginRight: "24px",
                      width: "36px",
                      height: "36px",
                      color: "#acacac",
                    }}
                  >
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      marginRight: "24px",
                      width: "36px",
                      height: "36px",
                      color: "#acacac",
                    }}
                  >
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                    <path d="M13 2v7h7" />
                  </svg>
                )}
                {item.value}
              </div>
            </div>
            {item?.items ? (
              <TreeItems tree={{ items: item.items }} level={level + 1} />
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
