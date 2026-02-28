export default function Footer() {
  return (
    <footer
      style={{
        marginTop: "30px",
        padding: "15px",
        borderTop: "1px solid black",
        textAlign: "center",
      }}
    >
      <p>
        © {new Date().getFullYear()} realEstate | All Rights Reserved
      </p>

      <p>
        GitHub:{" "}
        <a
          href="https://github.com/deathKiller10/mern-realEstate-platform"
          target="_blank"
          rel="noopener noreferrer"
        >
            realEstate-platform
        </a>
      </p>

      <p>Contact: +91-9876023210</p>
    </footer>
  );
}