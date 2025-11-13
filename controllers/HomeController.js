const HomeController = (request, response) => {
    response.status(200).json({message: "hello, from auth server :)"});
};


export default HomeController;