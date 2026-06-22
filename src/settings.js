function reset_progress() {
    Swal.fire({
        title: "Are you sure?",
        text: "All your achivements and progress will be reseted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d63030",
        cancelButtonColor: "rgb(102, 83, 83)",
        confirmButtonText: "Yes, delete it!",
        theme: "auto"
    }).then((result) => {
        if (result.isConfirmed) Swal.fire({
            title: "Deleted!",
            text: "Your progress has been deleted.",
            icon: "success",
            theme: "auto"
        });
        localStorage.setItem("MeowClicker_total", "0");
        localStorage.setItem("MeowClicker_delta", "1");

        localStorage.setItem("MeowClicker_ach_100", "false");
        localStorage.setItem("MeowClicker_ach_1000", "false");
        localStorage.setItem("MeowClicker_ach_10000", "false");
        localStorage.setItem("MeowClicker_ach_25000", "false");
        localStorage.setItem("MeowClicker_ach_50000", "false");
        localStorage.setItem("MeowClicker_ach_95000", "false");
        localStorage.setItem("MeowClicker_ach_100_000", "false");
    });
}