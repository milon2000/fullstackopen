const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((acc, currentValue) =>
        currentValue.likes > acc.likes ? currentValue : acc
    )
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}