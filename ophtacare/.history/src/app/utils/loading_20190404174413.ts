export class Loading {

    public loading (enable: boolean, display: any) {
        enable = true;
        setTimeout(() => {
            enable = false;
            display = true;
        }, 500);
    }
}
