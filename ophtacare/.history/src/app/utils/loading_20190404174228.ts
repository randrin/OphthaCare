export class Loading {

    public loading (enable: boolean, display: any) {
        enable = true;
        setTimeout(() => {
            display = true;
        });
    }
}
