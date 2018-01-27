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

            let toolbarView = new ToolbarView();
            let btnNew = new ButtonItem(strings.newTask, IconItem.newIcon(), () => {

            });
            toolbarView.toolbar.items.add( btnNew );

            let listView = new ListView();
            listView.columnHeaders.addArray([
                new ColumnHeader(strings.title),
                new ColumnHeader(strings.description)
            ]);

            toolbarView.view = listView;

            Task.catalog().send( tasks => {

                if( !!tasks.length ){
                    tasks.forEach( task => {
                        let listItem = new ListViewItem( listView );
                        listItem.setText(0, task.title );
                        listItem.setText(1, task.description );
                    });

                }
            });

            View.mainView = toolbarView;
        }

    }

}