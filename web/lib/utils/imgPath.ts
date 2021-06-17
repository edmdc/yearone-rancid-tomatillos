const imageConfig = {
  backdrop: ["w300", "w780", "w1280", "original"],
  logo: ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
  poster: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
  profile: ["w45", "w185", "h632", "original"],
  still: ["w92", "w185", "w300", "original"],
}

type ImageType = "backdrop" | "logo" | "poster" | "profile" | "still"

export default function imgPath(type: ImageType, size: number) {
  return `https://image.tmdb.org/t/p/${imageConfig[type][size]}`
}
