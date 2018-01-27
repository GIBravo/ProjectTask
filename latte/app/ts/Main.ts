module latte {

    import ColumnHeader = latte.ColumnHeader;
    /**
     * Main Class
     * Your app starts here.
     */
    export class Main {

        /**
         * Start your program on the constructor.
         */
        constructor() {
            View.mainView =  new MainTaskView();
        }

    }

}