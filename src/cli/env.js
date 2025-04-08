const parseEnv = () => {
    const envEntries = Object.entries(process.env);
    console.log(
        envEntries
            .filter((el) => el[0].startsWith("RSS_"))
            .map((el) => `${el[0]}=${el[1]}`)
            .join('; ')
    );
};

parseEnv();
