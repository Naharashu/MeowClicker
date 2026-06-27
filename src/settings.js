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
        if (result.isConfirmed) {
            Swal.fire({
                title: "Deleted!",
                text: "Your progress has been deleted.",
                icon: "success",
                theme: "auto"
            });
            fetch("https://clicker-api.sagansi789.workers.dev", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: localStorage.getItem("PlayerUUIDMClicker"),
                    action: "delete"
                })
            })
                .then(r => r.json())
            localStorage.removeItem("MeowClicker_total");
            localStorage.removeItem("MeowClicker_delta");
            localStorage.removeItem("MeowClicker_step");
            localStorage.removeItem("MeowClicker_seen");

            localStorage.removeItem("MeowClicker_ach_100");
            localStorage.removeItem("MeowClicker_ach_1000");
            localStorage.removeItem("MeowClicker_ach_10000");
            localStorage.removeItem("MeowClicker_ach_25000");
            localStorage.removeItem("MeowClicker_ach_50000");
            localStorage.removeItem("MeowClicker_ach_95000");
            localStorage.removeItem("MeowClicker_ach_100_000");
            localStorage.removeItem("MeowClicker_ach_200_000");
        }
    });
}