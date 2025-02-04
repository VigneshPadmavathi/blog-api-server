let baseUrl = "https://us-central1-blog-server-api.cloudfunctions.net";
let blogs = [];
const getMyElementByItsId = (id) => {
  return document.getElementById(id);
};

const fetchBlogs = async () => {
  try {
    const response = await fetch(`${baseUrl}/readBlog-readBlog`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// function to exract the data from the array and to load it to the blog list container
const loadBlogListContainer = () => {
  const blogListContainer = getMyElementByItsId("blogListContainer");
  blogListContainer.innerHTML = "";
  if (blogs.length > 0) {
    blogs.forEach((blog, index) => {
      blogListContainer.innerHTML += generateBlogListCardItem(blog, index);
    });
  } else {
    blogListContainer.innerHTML = "<p>No Blog data</p>";
  }
};

// function to genrate the HTML element
const generateBlogListCardItem = (blog, index) => {
  return `
        <div onclick="loadDataIntoMainContainer(${index});" class="w-full rounded-md p-2 flex flex-col items-center justify-center">
            <img class="w-full h-44 md:h-56 object-cover" src="${blog.cover_image}" />
            <p>${blog.title}</p>
        </div>
    `;
};

// function to load the data into the main content
const loadDataIntoMainContainer = (index) => {
  const data = blogs[index];
  const selectedBlogContainer = getMyElementByItsId("selectedBlogContainer");
  selectedBlogContainer.innerHTML = "";
  selectedBlogContainer.innerHTML = generateMainBlogContainer(data);
};

// function to generate the html elements for the main content
const generateMainBlogContainer = (data) => {
  return `
        <h2>${data.title}</h2>
        <img src = "${data.cover_image}" class="w-full  h-44 md:h-[460px] object-cover rounded-md"/>
        <p>${data.description}<p/>
        <p>${data.content}<p/>
    `;
};

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  //   check the user preferences
  const currentmode = localStorage.getItem("mode");
  console.log("Current Mode : ", currentmode);

  if (currentmode === "dark") {
    body.classList.add("dark");
  }

  //   toggle between the dark and light
  toggleMenu.addEventListener("click", () => {
    console.log("Current Mode : ", currentmode);

    toggleMenuIcon.classList.toggle("bxs-sun");
    body.classList.toggle("dark");
    // Update the user's preference in localStorage
    localStorage.setItem(
      "mode",
      body.classList.contains("dark") ? "dark" : "light"
    );
  });

  // Fetch blogs and render them on the right side
  fetchBlogs()
    .then((data) => {
      blogs = data;
      loadBlogListContainer();
      loadDataIntoMainContainer(0);
    })
    .catch((error) => {
      console.error(error);
    });
});
