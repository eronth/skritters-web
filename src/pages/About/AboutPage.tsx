import Header from "../../common/Header";

export default function AboutPage() {
  return (
    <>
      <Header selectedTab="about" />
      <div className="page-content">
        <p>This is the About page where you can learn more about this application.</p>
        <p>Here you can find information about the features, how to use the app, and more.</p>
        {/* Add more content and components related to the About page here */}
      </div>
    </>
  );
}