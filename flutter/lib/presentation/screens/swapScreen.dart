import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:furniswap/data/models/swap/SwapProductModel.dart';
import 'package:furniswap/icons/icons.dart';
import 'package:furniswap/presentation/manager/swap/cubit/swap_cubit.dart';
import 'package:furniswap/presentation/screens/swapDetailsScreen.dart';

class SwapScreen extends StatefulWidget {
  const SwapScreen({super.key});

  @override
  State<SwapScreen> createState() => _SwapScreenState();
}

class _SwapScreenState extends State<SwapScreen> {
  @override
  void initState() {
    super.initState();
    context.read<SwapCubit>().fetchSwapProducts();
  }

  Widget buildSwapItemCard(SwapProductModel product) {
    return Container(
      width: 358,
      height: 400,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black12,
            blurRadius: 4,
            offset: Offset(0, 2),
          ),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        borderRadius: BorderRadius.circular(12),
        child: InkWell(
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (_) => SwapDetailsScreen(product: product),
              ),
            );
          },
          borderRadius: BorderRadius.circular(12),
          splashColor: Colors.brown.withOpacity(0.1),
          highlightColor: Colors.brown.withOpacity(0.2),
          child: Padding(
            padding: const EdgeInsets.all(12.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(15),
                  child: SizedBox(
                    height: 192,
                    width: 326,
                    child: Image.network(
                      product.imageUrl,
                      fit: BoxFit.cover,
                      errorBuilder: (_, __, ___) =>
                          const Icon(Icons.image, size: 40),
                    ),
                  ),
                ),
                const SizedBox(height: 12),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 8),
                  child: Text(
                    product.name,
                    style: const TextStyle(
                      color: Color(0xff2C1810),
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                const SizedBox(height: 8),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 8),
                  child: Text(
                    product.description,
                    style: const TextStyle(fontSize: 13, color: Colors.grey),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                const SizedBox(height: 10),
                ElevatedButton(
                  onPressed: () {},
                  style: ElevatedButton.styleFrom(
                    padding: const EdgeInsets.all(10),
                    elevation: 0,
                    backgroundColor: const Color(0xffF8F5F1),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                  child: Row(
                    children: [
                      const Icon(
                        MyFlutterApp.sync_icon,
                        color: Colors.black,
                        size: 15,
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          "Looking for: ${product.priceType}",
                          style: const TextStyle(
                              color: Color(0xff4A3F35), fontSize: 13),
                        ),
                      )
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<SwapCubit, SwapState>(
      builder: (context, state) {
        if (state is SwapLoading) {
          return const Center(child: CircularProgressIndicator());
        } else if (state is SwapLoaded) {
          return Padding(
            padding: const EdgeInsets.all(15.0),
            child: ListView.separated(
              itemCount: state.products.length,
              separatorBuilder: (_, __) => const SizedBox(height: 15),
              itemBuilder: (context, index) =>
                  buildSwapItemCard(state.products[index]),
            ),
          );
        } else if (state is SwapError) {
          return Center(child: Text("❌ ${state.message}"));
        } else {
          return const Center(child: Text("لم يتم تحميل المنتجات بعد."));
        }
      },
    );
  }
}
